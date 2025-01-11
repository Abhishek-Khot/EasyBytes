import React, { useState } from "react";
import axios from "axios";

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        params: { name: searchTerm },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Search Section */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users by name"
        />
        <button onClick={handleSearch}>Search</button>

        {/* Users List */}
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              onClick={() => fetchUserDetails(user._id)}
              style={{ cursor: "pointer", margin: "10px 0" }}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* User Details Section */}
      {selectedUser && (
        <div
          style={{ border: "1px solid #ccc", padding: "20px", width: "400px" }}
        >
          {/* Profile Photo */}
          {/* Profile Photo */}
          {selectedUser.profilePhoto ? (
            <img
              src={`http://localhost:5000/${selectedUser.profilePhoto}`}
              alt={`${selectedUser.name}'s Profile`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          ) : (
            <p>Profile photo not available</p>
          )}
          <h2>{selectedUser.name}</h2>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>

          {/* Homepage Information */}
          {selectedUser.homepage && (
            <div>
              <h3>Homepage</h3>
              <p>
                <strong>Portfolio Name:</strong>{" "}
                {selectedUser.homepage.portfolioName || "N/A"}
              </p>
              <p>
                <strong>User Name:</strong>{" "}
                {selectedUser.homepage.userName || "N/A"}
              </p>
              <p>
                <strong>Expertise:</strong>{" "}
                {selectedUser.homepage.expertise.join(", ") || "N/A"}
              </p>
            </div>
          )}

          {/* About Section */}
          {selectedUser.about && (
            <div>
              <h3>About</h3>
              <p>
                <strong>Description:</strong>{" "}
                {selectedUser.about.description || "N/A"}
              </p>
              <p>
                <strong>Skillset:</strong>{" "}
                {selectedUser.about.skillset.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Tools:</strong>{" "}
                {selectedUser.about.tools.join(", ") || "N/A"}
              </p>
            </div>
          )}

          {/* Projects */}
          {selectedUser.projects && selectedUser.projects.length > 0 && (
            <div>
              <h3>Projects</h3>
              {selectedUser.projects.map((project, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Name:</strong> {project.name}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>
                  {project.photo && (
                    <img
                      src={`http://localhost:5000/${project.photo}`}
                      alt={project.name}
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.githubLink}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* blogs*/}
          {selectedUser.blogs && selectedUser.blogs.length > 0 && (
            <div>
              <h3>Blogs</h3>
              {selectedUser.blogs.map((blog, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Topic:</strong> {blog.topic}
                  </p>
                  <p>
                    <strong>Technology:</strong> {blog.technology}
                  </p>
                  <p>
                    <strong>Title:</strong> {blog.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {blog.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Resume */}
          {selectedUser.resume && selectedUser.resume.photoPath ? (
            <div>
              <h3>Resume</h3>
              <img
                src={`http://localhost:5000${selectedUser.resume.photoPath}`} // Dynamically use the photoPath field
                alt="Resume"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          ) : (
            <p>No resume photo uploaded.</p>
          )}

          {/* Social Links */}
          {selectedUser.socialLinks && selectedUser.socialLinks.length > 0 && (
            <div>
              <h3>Social Links</h3>
              <ul>
                {selectedUser.socialLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Contact Form */}
          <footer>
            <h3>Contact Us</h3>
            <form>
              <label htmlFor="name">Name:</label>
              <br />
              <input id="name" type="text" placeholder="Enter your name" />
              <br />
              <label htmlFor="companyName">Company Name:</label>
              <br />
              <input
                id="companyName"
                type="text"
                placeholder="Enter company name"
              />
              <br />
              <label htmlFor="description">Description:</label>
              <br />
              <textarea
                id="description"
                placeholder="Enter description"
                rows={3}
              ></textarea>
              <br />
              <label htmlFor="oaLink">OA Link:</label>
              <br />
              <input id="oaLink" type="text" placeholder="Enter OA link" />
              <br />
              <button type="submit">Submit</button>
            </form>
          </footer>
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
