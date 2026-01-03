// CommunityPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import gsap from "gsap";

import PostCard from "../components/core/Community/PostCard";
import CreatePostModal from "../components/core/Community/CreatePost";
import BlogFilters from "../components/core/Community/BlogFilters";
import BlogDetailsModal from "../components/core/Community/BlogDetailsModal";
import EditPostModal from "../components/core/Community/EditPostModal";
import Leaderboard from "../components/core/Community/Leaderboard";
import Footer from "../components/common/Footer";

import {
  getAllBlogs,
  toggleLikeBlog,
  addCommentToBlog,
} from "../services/operations/communityApi";

import {
  setLoading,
  setBlogs,
  removeBlog,
} from "../slices/communitySlice";

const CommunityPage = () => {
  // Redux state
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const { blogs, loading } = useSelector((state) => state.community);
  const dispatch = useDispatch();

  // Local state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [selectedBlogForEdit, setSelectedBlogForEdit] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [hasShownWelcomeToast, setHasShownWelcomeToast] = useState(false);

  // Refs
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const postsRef = useRef([]);

  // Theme styles
  const themeStyles = {
    background: isDarkMode ? "bg-gray-900" : "bg-[#F9FAFB]",
    heading: isDarkMode ? "text-white" : "text-gray-900",
    subtitle: isDarkMode ? "text-gray-300" : "text-gray-600",
    loadingText: isDarkMode ? "text-white" : "text-gray-900",
    loadingSubtext: isDarkMode ? "text-gray-400" : "text-gray-600",
    button: isDarkMode
      ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-500"
      : "bg-[#cb8fff] border-[#C27BFF] hover:bg-[#d2a4fa] text-gray-700",
  };

  // Fetch blogs
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        dispatch(setLoading(true));
        const response = await dispatch(getAllBlogs());

        if (response && response.data) {
          dispatch(setBlogs(response.data));

          const hasShownToast = sessionStorage.getItem(
            "communityWelcomeToastShown"
          );

          if (!hasShownToast && !hasShownWelcomeToast) {
            toast.success(
              `Welcome! ${response.data.length} blog${
                response.data.length !== 1 ? "s" : ""
              } loaded`
            );
            sessionStorage.setItem(
              "communityWelcomeToastShown",
              "true"
            );
            setHasShownWelcomeToast(true);
          }
        }
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadBlogs();
  }, [dispatch, hasShownWelcomeToast]);

  // Restore toast state
  useEffect(() => {
    const hasShownToast = sessionStorage.getItem(
      "communityWelcomeToastShown"
    );
    if (hasShownToast) {
      setHasShownWelcomeToast(true);
    }
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const elements = [
        headerRef.current,
        ...postsRef.current.filter(Boolean),
      ];

      gsap.set(elements, { y: 30, opacity: 0 });

      const tl = gsap.timeline();
      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }).to(
        postsRef.current.filter(Boolean),
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
    }, pageRef);

    return () => ctx.revert();
  }, [blogs]);

  // Handlers
  const handleAddPost = () => setShowCreateModal(false);

  const handleViewDetails = (blogId) => {
    setSelectedBlogId(blogId);
    setShowDetailsModal(true);
  };

  const handleEditPost = (post) => {
    setSelectedBlogForEdit(post);
    setShowEditModal(true);
  };

  const handleFilterChange = (type, data) => {
    if (type === "all") setFilteredBlogs([]);
    else setFilteredBlogs(data || []);
  };

  const handleLike = async (blogId) => {
    try {
      await dispatch(toggleLikeBlog(blogId));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleAddComment = async (blogId, comment) => {
    try {
      await dispatch(addCommentToBlog(blogId, comment));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const addPostRef = (el, index) => {
    postsRef.current[index] = el;
  };

  const displayBlogs =
    filteredBlogs.length > 0 ? filteredBlogs : blogs;

  return (
    <>
      <section
        ref={pageRef}
        className={`min-h-screen ${themeStyles.background} py-8 relative transition-colors duration-300`}
      >
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{
            duration: 35,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage:
              "radial-gradient(circle, #10B981 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div
            ref={headerRef}
            className="flex justify-between items-center my-16"
          >
            <div>
              <h1
                className={`text-5xl lg:text-6xl font-bold ${themeStyles.heading}`}
              >
                <span className="text-purple-400">Community</span>{" "}
                <span className="text-green-400">Blog</span>
              </h1>
              <p
                className={`${themeStyles.subtitle} text-lg mt-4 max-w-xl`}
              >
                Share your waste management journey and inspire others
                with your sustainable living stories
              </p>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className={`${themeStyles.button} border font-semibold flex items-center gap-2 rounded-full px-3 py-2 shadow-md`}
            >
              <Plus className="w-5 h-5" /> Create New
            </button>
          </div>

          {/* Modals */}
          <CreatePostModal
            show={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleAddPost}
          />

          <BlogDetailsModal
            show={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            blogId={selectedBlogId}
          />

          <EditPostModal
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            post={selectedBlogForEdit}
          />

          {/* Filters */}
          <BlogFilters onFilterChange={handleFilterChange} />

          {/* Content */}
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {displayBlogs.map((post, idx) => (
                  <motion.div
                    key={post._id}
                    className="break-inside-avoid mb-6 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <PostCard
                      post={post}
                      onLike={() => handleLike(post._id)}
                      onAddComment={(c) =>
                        handleAddComment(post._id, c)
                      }
                      onViewDetails={handleViewDetails}
                      onEditPost={handleEditPost}
                      refSetter={(el) => addPostRef(el, idx)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="w-80 hidden lg:block">
              <Leaderboard blogs={blogs} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CommunityPage;
