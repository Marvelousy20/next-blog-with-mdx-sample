interface Prop {
  name: string;
}

const Text = ({ name }: Prop) => {
  const city = "london";
  return (
    <div>Hey, my, name is {name} and this is my first markdown posts.</div>
  );
};

export default Text;
