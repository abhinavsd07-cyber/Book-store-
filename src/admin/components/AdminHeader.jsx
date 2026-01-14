import bookLogo from "../../assets/bookLogo.png";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header className="border border-zinc-400">
        <div className="grid grid-cols-3 items-center p-5">
          <img src={bookLogo} alt="" className="h-10" />

          <h1 className="text-2xl font-semibold text-center">Welcome Admin</h1>

          <div className="flex items-center justify-end gap-3">
            <button
              className="text-center cursor-pointer border px-3 py-1 rounded-2xl hover:bg-black hover:text-white"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
