import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const checkExter = async () => {
    // const url = "/api/v1/exter";
    const url = "/api/exter1";
    const data = await axios.get(url);
    return data;
  };

  useQuery({
    queryKey: ["exter"],
    queryFn: checkExter,
    onSuccess: (data: any) => {
      console.log("Success ", data);
    },
    onError: (data: any) => {
      console.log("Error ", data);
    },
  });
  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <p>This is guide for using bot is still being written</p>
        <p>Typing message on input box and enter to start interacting</p>
      </div>
    </div>
  );
};

export default HomePage;
