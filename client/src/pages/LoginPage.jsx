import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, error, isAuthenticated } = useAuth();7
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });

  useEffect(() => {
    if(isAuthenticated){
      navigate('/tasks')
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 w-1/4 p-10 rounded-md flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Login</h1>

        {error.map((err, i) => (
          <p key={i} className="text-red-500">
            {err}
          </p>
        ))}
        <form onSubmit={onSubmit} className="flex flex-col gap-5 ">
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            className="w-full p-2 bg-zinc-700 text-white rounded-md "
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">This email is required</span>
          )}
          <input
            type="password"
            name="password"
            {...register("password", { required: true })}
            className="w-full p-2 bg-zinc-700 text-white rounded-md "
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">This password is required</span>
          )}
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 px-4 rounded-md font-semibold shadow-lg">Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account? 
          <Link to="/register" className="text-sky-600 hover:text-sky-700">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
