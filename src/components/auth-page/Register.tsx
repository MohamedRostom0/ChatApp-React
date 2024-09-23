import { useNavigate } from "react-router-dom";
import { Formik, FormikErrors } from "formik";
import reactLogo from "../../assets/react.svg";
import useHttp from "../../hooks/use-http";
import { userRegister } from "../../api/auth";

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const { sendRequest, data, error: apiError, status } = useHttp(userRegister);

  if (status === "completed" && data !== null) {
    navigate("/auth?fn=login");
  }

  const validate = (values: RegisterValues): FormikErrors<RegisterValues> => {
    const errors: FormikErrors<RegisterValues> = {};

    if (!values.name) {
      errors.name = "Name field is required";
    }

    if (!values.email) {
      errors.email = "Email field is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password field is required";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm-Password field is required";
    }

    if (values.password !== values.confirmPassword) {
      errors.password = "Password and Confirm-Password fields must match";
    }

    return errors;
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <a href="/">
          <img className="mx-auto h-10 w-auto" src={reactLogo} alt="Nike" />
        </a>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[75%] p-5">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
          }}
          validate={validate}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            sendRequest({
              username: values.name,
              email: values.email,
              password: values.password,
            });
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
              <div className="md:grid md:grid-cols-2 md:gap-3 flex flex-col">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      required
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      required
                      className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-2 mt-4">
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-1/2 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red"
                    >
                      Sign up
                    </button>
                  </div>
                </div>

                <div className="text-red-700 flex flex-col space-y-1">
                  {apiError && <p>{apiError}</p>}

                  {errors.name && touched.name && <p>{errors.name}</p>}
                  {errors.email && touched.email && <p>{errors.email}</p>}
                  {errors.password && touched.password && (
                    <p>{errors.password}</p>
                  )}
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p>{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/auth?fn=login"
            className="font-semibold leading-6 text-coral-red hover:text-indigo-400"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
