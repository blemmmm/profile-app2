const { useState, useEffect, useCallback } = require('react');
const useHistory = () => {
  const [previous_pathname, set_previous_pathname] = useState(null);
  const [pathname, set_pathname] = useState(window.location.pathname);
  const push = useCallback((next_pathname) => {
    if (pathname !== next_pathname) {
      window.history.pushState(null, null, next_pathname);
      set_previous_pathname(pathname);
      set_pathname(next_pathname);
    }
  }, [pathname]);
  const replace = useCallback((next_pathname) => {
    if (pathname !== next_pathname) {
      window.history.replaceState(null, null, next_pathname);
      set_previous_pathname(pathname);
      set_pathname(next_pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const popstate_listener = () => {
      set_previous_pathname(pathname);
      set_pathname(window.location.pathname);
    };
    window.addEventListener('popstate', popstate_listener);
    return () => {
      window.removeEventListener('popstate', popstate_listener);
    };
  }, [pathname]);


  const history = {
    previous_pathname,
    pathname,
    push,
    replace,
  };

  return history;
};
export default useHistory;
