import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, FormikErrors } from "formik";
import reactLogo from "../../assets/react.svg";
import useHttp from "../../hooks/use-http";
import { userLogin } from "../../api/auth";
import { authActions } from "../../store/slices/auth";

interface LoginValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    sendRequest: loginRequest,
    data: loginResData,
    error: apiError,
    status,
  } = useHttp(userLogin);
  console.log(loginResData);
  if (status === "completed" && loginResData !== null) {
    if (loginResData && loginResData.access_token)
      dispatch(
        authActions.login({
          token: loginResData.access_token,
          user: loginResData.user,
        })
      );

    navigate("/chat");
  }

  const validate = (values: LoginValues) => {
    const errors: FormikErrors<LoginValues> = {};

    if (!values.email) {
      errors.email = "Email field is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password field is required";
    }

    return errors;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <img className="mx-auto h-10 w-auto" src={reactLogo} alt="Nike" />
        </a>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-600">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            loginRequest({ email: values.email, password: values.password });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href=""
                      className="font-semibold text-coral-red hover:text-red-400"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    required
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red"
                >
                  Sign in
                </button>
              </div>

              <div className="text-red-700 flex flex-col space-y-1">
                {apiError && <p>{apiError}</p>}

                {errors.email && touched.email && <p>{errors.email}</p>}
                {errors.password && touched.password && (
                  <p>{errors.password}</p>
                )}
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="/auth?fn=register"
            className="font-semibold leading-6 text-coral-red hover:text-indigo-400"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
