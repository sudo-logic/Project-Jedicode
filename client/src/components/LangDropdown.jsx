import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { globalState } from "../utils/proxy";
import axios from "axios";

export default function LangDropdown() {
  const changeState = globalState;

  const [load, setLoad] = useState(true);
  const [languages, setLanguages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchLanguages = async () => {
      return await axios
        .get(`https://ce.judge0.com/languages/all`)
        .then((res) => res.data.filter((lang) => !lang.is_archived));
    };

    fetchLanguages().then((res) => {
      console.log(res);
      setLanguages(res);
      setSelected(res[43]);
      setLoad(false);
    });
  }, []);

  useEffect(() => {
    if (selected) {
      console.log(`selected: ${selected.id}`);
      console.log(changeState.languageId);
      changeState.languageId = selected.id;
    }
  }, [selected]);

  return (
    <div className="bg-dark-layer-2 m-3 text-xs cursor-pointer font-medium rounded-md w-64">
      {load ? (
        <p className=" text-base py-2 pl-4">Loading...</p>
      ) : (
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1 w-64">
            <Listbox.Button className="relative text-white w-full cursor-default rounded-md py-2 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate font-bold">{selected?.name}</span>
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
              <Listbox.Options className="absolute mt-1 max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {languages?.map((language, languageIdx) => (
                  <Listbox.Option
                    key={languageIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-dark-gray-7 text-white" : "text-gray-900"
                      }`
                    }
                    value={language}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {language.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-neutral-950">
                            ✦
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
}
