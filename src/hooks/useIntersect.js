import { useEffect, useRef, useState } from "react";

export default ({ root = null, rootMargin, threshold = 0 }) => {
  const [entry, updateEntry] = useState({});
  const [node, setNode] = useState(null);

  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new window.IntersectionObserver(
      ([entry]) => {
        updateEntry(entry);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );
    const { current: currentObserver } = observer;

    if (node) currentObserver.observe(node);
    return () => currentObserver.disconnect();
  }, [node, rootMargin, root, threshold]);

  return [setNode, entry];
};
