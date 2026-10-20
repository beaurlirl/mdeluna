#!/usr/bin/env python3
"""Grade site photos into one consistent "architectural render" look.

The files in public/ are the GRADED versions. Never grade them again (that
doubles the effect). The untouched originals live outside the repo, in
~/Desktop/mdelunanewsite-photos-original/public, laid out like public/.

  Add or replace a photo:
    1. put the original in ~/Desktop/mdelunanewsite-photos-original/public/<same path>
    2. python3 scripts/grade-stills.py ~/Desktop/mdelunanewsite-photos-original/public public

  Needs Python 3 with Pillow and numpy. Reads .jpg/.jpeg/.webp, writes the same
  names and formats. Every photo is graded on its own (the settings below are
  fixed), so regrading one never changes another.

Two steps per photo:
  1. Normalise: white balance from near-neutral surfaces (65% strength, so real
     paint colours survive), gentle exposure to a common mid-tone, black and
     white points, and saturation pulled toward the set's typical value.
  2. The preset: 80% saturation, a soft S-curve with blacks lifted to 2%, and a
     cool mid-tone shift that fades to neutral at pure white.
"""
import io
import os
import sys
import warnings

import numpy as np
from PIL import Image, ImageCms, ImageOps

warnings.filterwarnings("ignore")

TARGET_CHROMA = 0.185   # typical colourfulness of the set; photos are pulled toward it
SAT = 0.80
TABLES = {  # 9-point tone tables, shadow to highlight, per channel
    "r": [0.019, 0.108, 0.22, 0.348, 0.485, 0.625, 0.762, 0.889, 1],
    "g": [0.02, 0.113, 0.229, 0.362, 0.503, 0.645, 0.78, 0.901, 1],
    "b": [0.021, 0.121, 0.247, 0.388, 0.537, 0.682, 0.814, 0.924, 1],
}
JPEG_QUALITY = 88
WEBP_QUALITY = 88

W = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
SRGB = ImageCms.createProfile("sRGB")
LUT = [np.interp(np.arange(256) / 255.0, np.linspace(0, 1, 9), TABLES[c]) for c in "rgb"]
SAT_M = np.array([
    [0.213 + 0.787 * SAT, 0.715 - 0.715 * SAT, 0.072 - 0.072 * SAT],
    [0.213 - 0.213 * SAT, 0.715 + 0.285 * SAT, 0.072 - 0.072 * SAT],
    [0.213 - 0.213 * SAT, 0.715 - 0.715 * SAT, 0.072 + 0.928 * SAT],
], dtype=np.float32)


def lum(a):
    return a[..., 0] * W[0] + a[..., 1] * W[1] + a[..., 2] * W[2]


def chroma(a):
    return a.max(-1) - a.min(-1)


def load(path):
    im = Image.open(path)
    fmt, icc = im.format, im.info.get("icc_profile")
    im = ImageOps.exif_transpose(im)
    if icc:
        try:
            im = ImageCms.profileToProfile(
                im.convert("RGB"), ImageCms.ImageCmsProfile(io.BytesIO(icc)), SRGB, outputMode="RGB")
        except Exception:
            pass
    return np.asarray(im.convert("RGB"), dtype=np.float32) / 255.0, fmt


def white_balance(a):
    lin = a ** 2.2
    ya = lum(a)
    sat = chroma(a) / (a.max(-1) + 1e-6)
    near_neutral = (ya > 0.22) & (ya < 0.95) & (sat < 0.30)
    if near_neutral.mean() > 0.04:
        ref, strength = lin[near_neutral].mean(0), 0.65   # surfaces that are really white or grey
    else:
        ref, strength = lin.reshape(-1, 3).mean(0), 0.30  # no such surfaces: weak gray-world
    gains = np.clip((ref.mean() / ref) ** strength, 0.80, 1.25)
    gains = gains / (gains * W).sum()                      # keep brightness
    return np.clip(lin * gains, 0, 1) ** (1 / 2.2)


def exposure(a):
    ya = lum(a)
    median = max(float(np.percentile(ya, 50)), 0.02)
    gamma = float(np.clip((np.log(0.45) / np.log(median)) ** 0.5, 0.80, 1.10))
    a = a ** gamma
    ya = lum(a)
    black = min(float(np.percentile(ya, 0.5)), 0.05) * 0.8
    white_in = float(np.percentile(ya, 99.5))
    white = white_in + (max(white_in, 0.92) - white_in) * 0.7
    return np.clip((a - black) / (white - black), 0, 1)


def saturation(a):
    factor = float(np.clip((TARGET_CHROMA / max(float(chroma(a).mean()), 1e-3)) ** 0.6, 0.65, 1.12))
    y = lum(a)[..., None]
    return np.clip(y + (a - y) * factor, 0, 1)


def preset(a):
    a = np.clip(np.einsum("hwc,kc->hwk", a, SAT_M), 0, 1)
    idx = np.rint(a * 255).astype(np.uint8)
    return np.stack([LUT[c][idx[..., c]] for c in range(3)], -1)


def grade_file(src, dst):
    a, fmt = load(src)
    out = preset(saturation(exposure(white_balance(a))))
    im = Image.fromarray(np.rint(np.clip(out, 0, 1) * 255).astype(np.uint8))
    os.makedirs(os.path.dirname(dst) or ".", exist_ok=True)
    if fmt == "WEBP":
        im.save(dst, "WEBP", quality=WEBP_QUALITY, method=6)
    else:
        im.save(dst, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True, subsampling=2)


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    src_root, out_root = sys.argv[1], sys.argv[2]
    if os.path.abspath(src_root) == os.path.abspath(out_root):
        sys.exit("Refusing to grade a folder onto itself: that would grade the photos twice.")
    n = 0
    for dirpath, _, names in sorted(os.walk(src_root)):
        for name in sorted(names):
            if name.lower().endswith((".jpg", ".jpeg", ".webp")):
                src = os.path.join(dirpath, name)
                grade_file(src, os.path.join(out_root, os.path.relpath(src, src_root)))
                n += 1
    print(f"graded {n} photos into {out_root}")


if __name__ == "__main__":
    main()
