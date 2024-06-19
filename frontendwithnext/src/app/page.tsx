import Login from "./Login/page";

import Sidebar from "./sideBar";

function Home() {
  return (
    <main className="grid grid-cols-4 gap-0 m-0 min-h-screen">
      <div className="bg-violet-500 col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-3">
        <div className="mt-14">
          <Login />
        </div>
      </div>
    </main>
  );
}

export default Home;
