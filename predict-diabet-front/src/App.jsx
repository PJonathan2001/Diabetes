import { useForm } from "react-hook-form";
import { predict } from "./api/predict";
import { useState } from "react";
import eliminar from "./assets/delete.svg";
function App() {
  const { register, handleSubmit, onChange, formState, reset } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit((data) => {
      predict(data).then((response) => {
        setResult(response.prediction);
      });
    })();
  };
  return (
    <div className="w-screen h-screen grid place-items-center bg">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-1/2 border border-gray-200 p-10 rounded-md shadow-2xl bg-white"
      >
        <h1 className="text-4xl my-6 text-center font-bold">
          Diabetes Predictor
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="Pregnancies"
            >
              {" "}
              Pregnancies
            </label>
            <input
              name="Pregnancies"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              onChange={onChange}
              type="number"
              placeholder="Pregnancies"
              {...register("Pregnancies", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
            />
            {formState.errors.Pregnancies && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="PlasmaGlucose"
            >
              {" "}
              Plasma Glucose
            </label>
            <input
              name="PlasmaGlucose"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="Plasma Glucose"
              {...register("PlasmaGlucose", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.PlasmaGlucose && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>

          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="DiastolicBloodPressure"
            >
              {" "}
              Diastolic Blood Pressure
            </label>
            <input
              name="DiastolicBloodPressure"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="Diastolic Blood Pressure"
              {...register("DiastolicBloodPressure", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.DiastolicBloodPressure && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="TricepsThickness"
            >
              {" "}
              Triceps Thickness
            </label>
            <input
              name="TricepsThickness"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="Triceps Thickness"
              {...register("TricepsThickness", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.TricepsThickness && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="SerumInsulin"
            >
              {" "}
              Serum Insulin
            </label>
            <input
              name="SerumInsulin"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="Serum Insulin"
              {...register("SerumInsulin", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.SerumInsulin && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="BMI"
            >
              {" "}
              BMI
            </label>
            <input
              name="BMI"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="BMI"
              {...register("BMI", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.BMI && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="DiabetesPedigree"
            >
              {" "}
              Diabetes Pedigree
            </label>
            <input
              name="DiabetesPedigree"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="Diabetes Pedigree"
              {...register("DiabetesPedigree", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.DiabetesPedigree && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
          <div className="flex flex-col ">
            <label
              className="text-sm font-semibold text-gray-600"
              htmlFor="Age"
            >
              {" "}
              Age
            </label>
            <input
              name="Age"
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              type="number"
              placeholder="Age"
              {...register("Age", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              onChange={onChange}
            />
            {formState.errors.Age && (
              <p className="text-red-500">This field is required</p>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md w-1/3 col-span-2"
          >
            Predict
          </button>
          <div className="mr-12 flex gap-4 items-center">
            <img
              src={eliminar}
              alt="delete"
              className="w-5 h-5 text-red-600 cursor-pointer"
              onClick={() => {
                setResult("");
                reset();
              }}
            />
            <h4
              className="text-sm font-semibold text-gray-600"
              htmlFor="Result"
            >
              Resultdado: <span className="text-blue-500">{result}</span>
            </h4>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
