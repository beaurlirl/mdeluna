import { motion } from 'framer-motion'

const ease = [0.65, 0, 0.35, 1]

// "MD/AIA" when collapsed; the missing letters slide out to spell
// "Michael De Luna, AIA, Architect" when expanded.
function Seg({ open, delay = 0, children }) {
  return (
    <motion.span
      className="inline-block whitespace-pre [overflow-x:clip] align-baseline"
      initial={false}
      animate={{ width: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </motion.span>
  )
}

function Wordmark({ expanded }) {
  return (
    <>
      M
      <Seg open={expanded}>ichael </Seg>
      D
      <Seg open={expanded} delay={0.06}>e Luna</Seg>
      <Seg open={!expanded}>/</Seg>
      <Seg open={expanded} delay={0.1}>, </Seg>
      AIA
      <Seg open={expanded} delay={0.14}>, Architect</Seg>
    </>
  )
}

export default Wordmark
