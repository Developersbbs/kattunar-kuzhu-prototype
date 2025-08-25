const { default: ScheduleForm } = require("@/components/meeting/ScheduleForm");
const { Suspense } = require("react");

export default function Page() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleForm />
    </Suspense>
  )
}
