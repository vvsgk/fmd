const Radio = ({ name, value }: { name: string; value: string }) => {
    return (
      <input type="radio" name={name} value={value} className="mr-2" />
    );
  };
  
  export default Radio;
  