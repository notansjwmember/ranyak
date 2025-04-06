import { useEffect, useRef, useState } from "react";
import { ranyak_backend } from "declarations/ranyak_backend";

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const lastMessage = useRef(null);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const fetchComments = async () => {
    try {
      const fetchedComments = await ranyak_backend.getComments();
      setComments(fetchedComments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        await ranyak_backend.addComment(newComment);
        setNewComment("");
        fetchComments();
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  return (
    <main>
      <div className="card flex" style={{ gap: "3rem" }}>
        <div
          className="flex flex-col"
          style={{ justifyContent: "space-between", gap: "10px" }}
        >
          <div className="avatar">
            <img src="image.jpg" alt="A picture of Caenar" />
          </div>
          <div>
            <div>
              <p style={{ fontWeight: "bold", maxWidth: "15ch" }}>
                Where I exist on the internet
              </p>
              <p className="desc" style={{ fontSize: "1rem" }}></p>
            </div>
            <div
              className="flex flex-col"
              style={{ marginTop: "1rem", gap: "5px" }}
            >
              <a
                className="icon-label"
                href="https://linkedin.com/in/caenarguen"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
                LinkedIn
              </a>
              <a
                className="icon-label"
                href="https://github.com/notansjwmember"
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
                Github
              </a>
              <a
                className="icon-label"
                href="https://facebook.com/bobo.o.ng.bulaklak"
                target="_blank"
              >
                <i className="fa-brands fa-facebook"></i>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col"
          style={{ justifyContent: "space-between" }}
        >
          <div className="flex flex-col">
            <h1>👋 Hello, I'm Caenar!</h1>
            <p className="desc">That's pronounced as "kay-nar" by the way</p>

            <div
              className="flex flex-col"
              style={{ gap: "1rem", marginTop: "1.2rem" }}
            >
              <p>
                I'm a second-year BSIT student at Divine Word College of
                Legazpi, majoring in Web Development. I enjoy solving problems
                and diving deep into the lower levels of programming. I've built
                several hobby projects to sharpen my skills and grow my
                portfolio. Right now, my goal is to deepen my understanding of
                web development as a whole, then branch out into other areas
                like low-level and functional programming.
              </p>

              <div className="line"></div>

              <div>
                <h3>
                  Language & Technologies{" "}
                  <span className="desc">(that i use often)</span>
                </h3>
                <ul className="grid" style={{ gap: "3px", marginTop: "5px" }}>
                  <li>Javascript / Typescript</li>
                  <li>React / Next.js</li>
                  <li>Crustacean (Rust)</li>
                  <li>Neovim, btw</li>
                  <li>Arch, btw</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card flex flex-col" style={{ gap: "0.7rem" }}>
        <h2>Wanna leave a message?</h2>
        <ul className="history-container">
          {loading ? (
            <li>Loading...</li>
          ) : comments.length === 0 ? (
            "No comments right now"
          ) : (
            comments.map((comment, index) => (
              <li key={index} className="chat-container" ref={lastMessage}>
                <p className="date">
                  {new Date(
                    Number(comment.time) / 1000000,
                  ).toLocaleString()}{" "}
                </p>
                <p>{comment.text}</p>
              </li>
            ))
          )}
        </ul>
        <div className="input-container">
          <input
            type="text"
            placeholder="Send a message, don't worry it's anonymous"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" onClick={handleAddComment}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
