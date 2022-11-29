import { useEffect } from 'react'

function сreatingArray(arr: any[], renderTime: any) {
  const array = []
  if (renderTime < 3) renderTime = 3
  else if (renderTime > arr.length - 4) renderTime = arr.length - 5

  for (let i = renderTime - 3; i < renderTime + 1; i++) {
    array.push(arr[i])
  }
  for (let i = renderTime + 1; i < renderTime + 5; i++) {
    array.push(arr[i])
  }
  return array
}

export const FormChoiceTime = ({
  selectInformation,
  setSelectInformation,
  arr,
  BookedTime,
  setSelectStep,
  renderTime,
  setRenderTime,
}: any) => {
  useEffect(() => {
    setRenderTime(arr.indexOf(selectInformation.selectTime))
  }, [selectInformation.selectTime])

  console.log(renderTime)

  const times = сreatingArray(arr, renderTime)

  const handleTime = (element: any) => {
    setSelectInformation({ ...selectInformation, activeTime: element })
    setSelectStep(2)
  }

  return (
    <div className="flex items-center flex-wrap justify-center gap-x-4 max-w-[100%] w-[448px]">
      {times.map((element, index) => (
        <button
          onClick={() => handleTime(element)}
          key={index}
          className={`w-[72px] h-[38px] flex flex-row justify-center items-center mb-[17px] rounded-lg shadow-xl text-gray-700 
                          ${
                            element === setSelectInformation.activeTime
                              ? ''
                              : BookedTime.includes(element)
                              ? 'text-gray-300 border border-gray-200'
                              : 'border border-gray-400'
                          }`}
        >
          {element}
        </button>
      ))}
      <div className="flex flex-wrap justify-between w-[448px]">
        <button
          className="flex flex-row justify-center items-center"
          onClick={() => (renderTime < 3 ? renderTime - 4 : setRenderTime(renderTime - 4))}
          disabled={renderTime < 3}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <label className="text-sm text-gray-700 font-medium leading-5">Посмотреть другое время</label>
        <button
          className="flex flex-row justify-center items-center"
          onClick={() => (renderTime > arr.length - 4 ? (renderTime = arr.length - 4) : setRenderTime(renderTime + 4))}
          disabled={renderTime > arr.length - 4}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
