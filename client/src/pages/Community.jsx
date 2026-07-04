// Create e:\CODE\bluprnt\client\src\pages\Community.jsx

import bg from "@/assets/2.jpg";
import AllProjects from "@/components/AllProjects";
import { Button } from "@/components/ui/button";
import { usePublicProjects } from "@/hooks/usePublicProjects";
import { Compass, Loader2 } from "lucide-react";

function Community() {
    const { projects, loading, hasMore, loadMore } = usePublicProjects();

    return (
        <div className="min-h-screen bg-cover bg-fixed bg-center m-auto bg-black/10 text-white overflow-x-hidden items-center flex flex-col pt-24" style={{ backgroundColor: "black", backgroundImage: `url(${bg})`, backgroundBlendMode: 'hard-light', opacity: "90%" }}>

            <div className="text-center flex flex-col items-center gap-2 mb-10">
                <Compass size={48} className="text-blue-400 animate-pulse" />
                <h1 className="text-4xl font-marker tracking-wider text-white">Community Explore</h1>
                <p className="text-md text-white/70 max-w-md">Discover learning roadmaps and blueprints shared by other developers.</p>
            </div>

            <div className="w-full max-w-4xl flex flex-col items-center px-4">
                {Array.isArray(projects) && projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={project.id || index} className="w-full relative border border-white/10 rounded-xl my-4 bg-white/5 backdrop-blur-sm shadow-lg hover:border-white/20 transition-all">
                            {/* Author Badge */}
                            <div className="absolute top-2 left-6 text-xs text-white/40 font-mono">
                                Created by: <span className="text-blue-400 font-semibold">{project.creatorName || "Anonymous"}</span>
                            </div>
                            <AllProjects className="text-white relative bg-transparent w-full" project={project} />
                        </div>
                    ))
                ) : !loading ? (
                    <div className="text-white/50 my-10 font-mono">No public roadmaps available yet. Be the first to share one!</div>
                ) : null}

                {loading && (
                    <div className="my-8 flex justify-center">
                        <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                )}

                {hasMore && !loading && (
                    <div className="flex justify-center my-8">
                        <Button
                            onClick={loadMore}
                            className="bg-white/20 hover:bg-white/30 text-white border-white/20 px-6 py-2 rounded-full"
                        >
                            Load More
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Community;
