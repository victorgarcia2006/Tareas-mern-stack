import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center ">
      <div className="bg-zinc-800 p-10 rounded-md w-1/4 flex flex-col gap-5">
        <h1 className="text-2xl font-bold">Register</h1>
        {error.map((err, i) => (
          <p key={i} className="text-red-500">
            {err}
          </p>
        ))}
        <form onSubmit={onSubmit} className="flex flex-col gap-5 ">
          <input
            type="text"
            name="username"
            {...register("username", { required: true })}
            className="w-full p-2 bg-zinc-700 text-white rounded-md "
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-red-500">This username is required</span>
          )}
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
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 w-full py-2 px-4 rounded-md font-semibold shadow-md">Register</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-600 hover:text-sky-700 ">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
