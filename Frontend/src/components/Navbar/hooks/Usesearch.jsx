import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../../../redux/slices/connectionSlice";

const useSearch = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.connections.users);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // API call
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      dispatch(findUser(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current?.contains(e.target)) setQuery("");
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!mobileSearchRef.current?.contains(e.target)) {
        setMobileSearchOpen(false);
        setQuery("");
      }
    };
    if (mobileSearchOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileSearchOpen]);

  const clearSearch = () => {
    setQuery("");
    setMobileSearchOpen(false);
  };

  return {
    query,
    setQuery,
    users,
    mobileSearchOpen,
    setMobileSearchOpen,
    searchRef,
    mobileSearchRef,
    clearSearch,
  };
};

export default useSearch;
