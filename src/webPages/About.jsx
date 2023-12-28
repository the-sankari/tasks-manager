import React from "react";
import { useTheme } from "../components/Theme";
import SideNavbar from "../components/SideNavbar";
const About = () => {
  const { dark } = useTheme();
  // Your personal information
  const authorName = "Raunaq Lubna";
  const university = "Tampere University of Applied Science";
  const Email = "Raqnaq.lubna@tuni.fi.";
  // Work details
  const workingHours = "89"; // In hours
  const challengingFeature = `Implement a smooth drag-and-drop functionality for the "challengingFeature" using React DnD. Maintain the feature sequence within the component's state, ensuring it updates seamlessly during drag-and-drop interactions. Employ the localStorage API, utilizing setItem and getItem methods to store and retrieve the feature order consistently across the component's lifecycle.`;
  return (
    <div className="flex m-10 justify-center">
      <div className="md:block hidden flex-none">
        <SideNavbar />
      </div>
      <div className="flex flex-col items-center justify-center -pt-10  lg:w-6/12">
        {/* <h1 className="text-3xl font-bold">About</h1> */}

        <img
          src="https://scontent-arn2-1.xx.fbcdn.net/v/t39.30808-6/334542165_506281028145020_6549277297032204139_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=06vm3S7cW7UAX9qhrQw&_nc_ht=scontent-arn2-1.xx&oh=00_AfDaq6fLPXtDePwwVYuPdrJl8o0pJkSc-TwiWj1TA4LMeQ&oe=658F615B "
          alt="profile"
          className="w-20 h-20 rounded-full mt-2"
        />
        <h1 className="text-xl font-semibold mt-4">{authorName}</h1>
        <h1 className="text-lg font-semibold mt-2">{university}</h1>
        {/* Contact information */}
        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <p>
            Email:{" "}
            <a
              href={`mailto:${Email}`}
              className="text-blue-900 hover:underline hover:cursor-pointer"
            >
              {Email}
            </a>
          </p>
        </div>
        {/* Work details */}
        <div className="mt-4">
          <p className="text-sm">
            <span className="text-lg font-semibold">Working Hours Spent:</span>{" "}
            {workingHours} hours
          </p>
          <p className="text-sm">
            <span className="text-lg font-semibold">
              {" "}
              Most Challenging Feature:
            </span>{" "}
            {challengingFeature}
          </p>

          {/* Instructions for running the application */}
          <div className="mt-4 ">
            <h2 className="text-2xl font-bold">Running the application:</h2>
            <ol className="list-decimal pl-6">
              <li>Open terminal</li>
              <li>
                Run the following command to install dependencies:
                <pre
                  className={`inline-block rounded-md mt-2 ml-1 px-1 ${
                    dark ? "bg-slate-300/90" : "bg-slate-100"
                  }`}
                >
                  <kbd className="text-red-600">npm install</kbd>
                </pre>
              </li>
              <li>
                Start the application:
                <pre
                  className={`inline-block rounded-md mt-2 ml-1 px-1 ${
                    dark ? "bg-slate-300/90" : "bg-slate-100"
                  }`}
                >
                  <kbd className="text-red-600">npm start</kbd>
                </pre>
              </li>
              <li>Open another terminal</li>
              <li>
                Start the server:
                <pre
                  className={`inline-block rounded-md mt-2 ml-1 px-1 ${
                    dark ? "bg-slate-300/90" : "bg-slate-100"
                  }`}
                >
                  <kbd className="text-red-600">npm run server</kbd>
                </pre>
              </li>
              <li>
                All set! Go to{" "}
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  localhost:3000
                </a>{" "}
                in your web browser.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
