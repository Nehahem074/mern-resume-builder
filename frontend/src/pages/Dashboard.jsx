function Dashboard() {

  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold">
        Welcome {user?.name}
      </h1>

    </div>
  );
}

export default Dashboard;