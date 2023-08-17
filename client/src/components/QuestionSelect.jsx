import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useSnapshot } from "valtio";
import { globalState } from "../utils/proxy";

const state = globalState
const URI = state.apiURI
const questions = await axios
  .get(`${URI}/questions/random/3`)
  .then((res) => {
    return res.data;
  });

console.log(questions);

export default function QuestionSelect(props) {
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchRandomQuestions() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/questions/random/3`,
        );
        setQuestions(response.data);
        setSelected(response.data[0]);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchRandomQuestions();
  }, []);

  useEffect(() => {
    props.onChange(selected);
  }, [selected]);

  return (
    <div className="bg-dark-layer-2 m-3 text-xs cursor-pointer font-medium rounded-md w-auto">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative text-white w-full cursor-default rounded-md py-2 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate font-bold">{selected?.title}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {
                // questions.length > 0 ? (
                questions.map((question) => (
                  <Listbox.Option
                    key={question.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-dark-gray-7 text-white" : "text-gray-900"
                      }`
                    }
                    value={question}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {question.title}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-neutral-950">
                            ✦
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))
                // ) : (
                //   <p>Loading questions...</p>
                // )
              }
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
