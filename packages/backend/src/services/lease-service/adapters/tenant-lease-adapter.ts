import axios from 'axios'
import { Lease, LeaseStatus, Person } from '../types'
import Config from '../../../common/config'

const apiBaseUrl = Config.core.url

const getLease = async (leaseId: string): Promise<Lease> => {
  const leaseResponse = await axios.get(apiBaseUrl + '/leases/' + leaseId)

  return leaseResponse.data.data
}

export { getLease }
