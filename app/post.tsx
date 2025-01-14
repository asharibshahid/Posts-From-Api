"use client";

import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Data() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/external");
        const result: { success: boolean; data: Post[]; message?: string } = await response.json();
        if (result.success) {
          setPosts(result.data);
        } else {
          setError(result.message || "Failed to fetch posts.");
        }
      } catch (err:any) {
        setError( err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-white text-gray-800">
           <header className="bg-emerald-600 text-white py-6">
             <h1 className="text-4xl font-bold text-center">Posts from API</h1>
          </header>
    
           <main className="container mx-auto px-4 py-10">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                 <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-200"
                >
                  <div className="p-6">
                    <h2 className="text-emerald-600 font-bold text-xl mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 text-sm">{post.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
    
          <footer className="bg-emerald-600 text-white py-4 text-center">
            <p>API Data Display © 2025</p>
          </footer>
        </div>
  );
}
