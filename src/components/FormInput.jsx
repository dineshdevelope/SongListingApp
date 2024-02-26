const FormInput = ({ name, type = "text", placeholder, register, error }) => {
  return (
    <div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="px-4 py-2 bg-gray-100 outline-none rounded w-full"
        {...register}
      />
      {error && <small className="text-red-500">{error.message}</small>}
    </div>
  );
};

export default FormInput;
