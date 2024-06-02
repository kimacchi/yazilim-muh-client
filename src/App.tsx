import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "./components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Input } from "./components/ui/input";
import axios from "axios";

const App = () => {
  const [questions, setQuestions] = React.useState([
    {
      question: "What is your desired size for your house? (in square meters.)",
      number: true,
    },
    {
      question:
        "How many rooms would you like (bedrooms, hall, kitchen etc. combined)?",
      answers: ["1", "2", "3", "4", "5", "6"],
    },
    {
      question: "What type of area do you want?",
      answers: ["Super Area", "Carpet Area", "Built Area"],
    },
    {
      question: "Which area locality do you wish to reside in?",
      answers: [
        "Bandel",
        "Phool Bagan, Kankurgachi",
        "Salt Lake City Sector 2",
        "BN Reddy Nagar",
        "Godavari Homes, Quthbullapur",
        "Manikonda, Hyderabad",
      ],
    },
    {
      question: "In which city would you like to reside in?",
      answers: [
        "Kolkata",
        "Mumbai",
        "Bangalore",
        "Delhi",
        "Chennai",
        "Hyderabad",
      ],
    },
    {
      question: "What should be the furnishing status of your desired house?",
      answers: ["Furnished", "Semi-Furnished", "Unfurnished"],
    },
    {
      question: "Are you moving as a family or as a bachelor?",
      answers: ["Family", "Bachelors"],
    },
    {
      question: "How many bathrooms would you like in your house?",
      answers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      question: "Who would you like to contact to when you need help?",
      answers: ["Contact Owner", "Contact Agent", "Contact Builder"],
    },
  ]);
  const [currentQuestion, setCurrentQuestion] = React.useState(-1);

  const [answers, setAnswers] = React.useState<string[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [predictedRent, setPredictedRent] = React.useState(null);

  const predictRent = async () => {
    // const res = await axios.post("", {})
    // setPredictedRent(res.data.predictedRent);
    setLoading(true);
    // setTimeout(() => {}, 5000);
    // setLoading(false);
  };

  React.useEffect(() => {
    console.log(answers);
  }, [answers]);
  return (
    <div className="w-full h-screen bg-zinc-900 flex flex-col items-center justify-center gap-8">
      {loading && (
        <div className="bg-gray-200 p-4 rounded-md">
          <h1 className="text-gray-900 text-2xl font-bold">
            Predicting rent...
          </h1>
        </div>
      )}
      {predictedRent && (
        <div className="bg-gray-200 p-4 rounded-md">
          <h1 className="text-gray-900 text-2xl font-bold">Predicted rent: </h1>
        </div>
      )}
      {!predictedRent && !loading && (
        <>
          {currentQuestion < 0 ? (
            <>
              <h1 className="text-gray-200 text-6xl font-bold font-mono">
                Find your{" "}
                <span className="font-pacifico-regular content-none after:bg-red-900 after:w-8 after:h-8">
                  dream
                </span>{" "}
                house.
              </h1>
              <button
                className="text-zinc-900 bg-gray-200 px-4 py-2 rounded-md"
                onClick={() => {
                  setCurrentQuestion(0);
                }}
              >
                start
              </button>
            </>
          ) : (
            <>
              <h1 className="text-gray-200 text-6xl font-bold font-mono w-3/5 text-center">
                {questions[currentQuestion].question}
              </h1>
              {questions[currentQuestion].number && (
                <Input
                  type="number"
                  placeholder="Enter a number"
                  onChange={(e) => {
                    setAnswers((prev) => {
                      const temp = [...prev];
                      temp[currentQuestion] = `${e.target.value}`;
                      return temp;
                    });
                  }}
                  className="w-96"
                  value={answers[currentQuestion] || ""}
                />
              )}
              {questions[currentQuestion].answers && (
                <Select
                  onValueChange={(e) => {
                    setAnswers((prev) => {
                      const temp = [...prev];
                      temp[currentQuestion] = e;
                      return temp;
                    });
                  }}
                  value={answers[currentQuestion] || ""}
                >
                  <SelectTrigger className="w-96">
                    <SelectValue placeholder="Select an answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {questions[currentQuestion].answers?.map((answer) => (
                      <SelectItem key={answer} value={answer}>
                        {answer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div className="flex gap-4">
                {currentQuestion > 0 && (
                  <button
                    className="text-zinc-900 bg-gray-200 px-4 py-2 rounded-md"
                    onClick={() => {
                      if (currentQuestion < questions.length - 1) {
                        setCurrentQuestion(currentQuestion - 1);
                      } else {
                        setCurrentQuestion(-1);
                      }
                    }}
                  >
                    {currentQuestion > 0 ? "previous" : ""}
                  </button>
                )}
                <button
                  className="text-zinc-900 bg-gray-200 px-4 py-2 rounded-md disabled:bg-gray-700 disabled:cursor-not-allowed"
                  onClick={async () => {
                    if (currentQuestion < questions.length - 1) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else {
                      await predictRent();
                    }
                  }}
                  disabled={!answers[currentQuestion]}
                >
                  {currentQuestion < questions.length - 1
                    ? "next"
                    : "Find your house"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
