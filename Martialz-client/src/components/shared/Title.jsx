
const Title = ({title}) => {
  return (
    <div className="my-12 w-full">
    <h3 className="md:text-5xl text-3xl text-center font-bold py-5">{title} </h3>
      <hr  className="w-14 border-error border-4 mx-auto"/>
    </div>
  );
};

export default Title;