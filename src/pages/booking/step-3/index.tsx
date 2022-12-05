export const Step3 = ({ selectInformation, reservationData }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-wrap flex-col items-center  max-w-[100%] w-[448px] mb-[20px] space-y-5 px-10 py-3 bg-white-400 shadow-xl rounded-xl">
        <div className="flex flex-wrap flex-col items-center border-b-2 border-gray-300 max-w-[100%] w-[448px] ">
          <h1 className="text-3xl font-extrabold mr-auto ml-auto mb-5 text-gray-900	">{reservationData.name}</h1>
          <label className="text-base mr-auto ml-auto mb-1 text-gray-700 font-medium leading-5">
            Время работы: {reservationData.workingHours.since} - {reservationData.workingHours.till}
          </label>
          <label className="text-base mr-auto ml-auto mb-7 text-gray-700 font-medium leading-5">
            {reservationData.adress}
          </label>
        </div>

        <div className="flex flex-wrap gap-1 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>

          <label className="text-base mr-auto mb-1 text-gray-700 font-medium leading-5">
            : Среда, 5 октбря, время: {selectInformation.activeTime}, гостей: {selectInformation.selectGuests}
          </label>
          <label className="ml-auto mr-auto text-base mb-[32px] mt-[24px] text-gray-700 font-medium leading-5">
            Ждем вас,бла,блаблабла
          </label>
        </div>
      </div>
    </div>
  )
}
