import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import data from "../data/portfolio.json";

const Projects = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const { projectDetails } = data;

  const closeModal = () => {
    setSelectedProject(null);
  };

  const galleryRef = useRef(null);

  const scrollGallery = (direction = "right") => {
    const el = galleryRef.current;
    if (!el) return;
    const amount = el.clientWidth || 600;
    el.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Projects - {data.name}</title>
        <meta name="description" content="View all of my projects and work samples" />
      </Head>
      {data.showCursor && <Cursor />}
      <div className={`relative ${data.showCursor && "cursor-none"}`}>
        <div className="gradient-circle"></div>
        <div className="gradient-circle-bottom"></div>

        <div className="container mx-auto mb-10">
          <Header />
          
          <div className="mt-10 laptop:mt-20 p-2 laptop:p-0">
            <h1 className="text-4xl laptop:text-6xl text-bold mb-5">Projects</h1>
            <p className="text-lg opacity-70 mb-10">
              A collection of my work and case studies
            </p>

            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 gap-8">
              {projectDetails && projectDetails.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                >
                  <div className="relative w-full h-80 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl text-bold mb-3">{project.title}</h2>
                    <p className="text-base opacity-70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Footer />
        </div>
      </div>

      {/* Modal for project details */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
            <div 
            className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full max-h-90vh overflow-y-auto relative text-gray-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl z-10"
            >
              ✕
            </button>
            
            <div className="p-6">
              <h1 className="text-3xl laptop:text-4xl text-bold mb-4">
                {selectedProject.title}
              </h1>
              <p className="text-lg opacity-70 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10"
                />

                <div
                  ref={galleryRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 p-2"
                >
                  {(selectedProject.images ? selectedProject.images : [selectedProject.image]).map((img, idx) => (
                    <div key={idx} className="min-w-[80%] laptop:min-w-[60%] snap-center flex items-center justify-center h-[70vh]">
                      <img
                        src={img}
                        alt={`${selectedProject.title} - ${idx + 1}`}
                        className="max-h-[70vh] max-w-full object-contain rounded-lg block mx-auto"
                      />
                    </div>
                  ))}
                </div>

                <div
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
