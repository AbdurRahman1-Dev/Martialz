
const Loading = () => {
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <h3 className="md:text-7xl text-3xl font-bold animate-pulse">L<span className="md:w-12 md:h-12 w-6 h-6 bg-error inline-block rounded-full animate-bounce"></span>ading..</h3>
    </div>
  );
};

export default Loading;