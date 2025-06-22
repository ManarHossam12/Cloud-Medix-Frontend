import api from "../axios";

export async function getTestRequestsByPatientCentral(patientId, testType) {
  const response = await api.get(`/test/${testType}/patient/viewTestRequests/central/${patientId}`);
  return response.data.data || [];
}

export async function addTestRequest(testRequestData) {
  const response = await api.post(`/test/addRequest`, testRequestData);
  return response.data;
}
