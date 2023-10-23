import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type HomePageProps = {};

const HomePage = ({}: HomePageProps) => {
  const checkExter = async () => {
    // const url = "/api/v1/exter";
    const url = "/api1/exter1";
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

  const checkPostExter = async () => {
    const url = "/api1/exter";
    const data = await axios.post(url, { data: 1 });
    return data;
  };

  const { mutate } = useMutation({
    mutationFn: checkPostExter,
    onSuccess: (data: any) => {
      console.log("data return ", data);
    },
    onError: (error: any) => {
      console.log("error ", error);
    },
  });

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <button
          onClick={() => {
            mutate();
          }}
          className="btn bg-red-200"
        >
          temp
        </button>
        <p>This is guide for using bot is still being written</p>
        <p>Typing message on input box and enter to start interacting</p>
      </div>
    </div>
  );
};

export default HomePage;
