import DashboardCard from '@/components/dashboard/DashboardCard'

export default function DashboardSettings() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        minHeight: '60vh'
      }}
    >
      <DashboardCard title='Settings'>
        <div>Dashboard Settings Page</div>
      </DashboardCard>
    </div>
  )
}
