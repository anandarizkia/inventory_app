import callAPI from '@/config/api';

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = 'api/v1';

export async function supplierService() {
  const url = `${ROOT_API}/${API_VERSION}/supplier`;

  return callAPI({
    url,
    method: 'GET',
    isToken: true,
  });
}

export async function supplierServiceStore(data: FormData) {
  const url = `${ROOT_API}/${API_VERSION}/supplier`;

  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function supplierServiceEdit(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/supplier/${id}/edit`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function supplierServiceUpdate(data: FormData, id: string) {
  const url = `${ROOT_API}/${API_VERSION}/supplier/${id}`;

  return callAPI({
    url,
    method: 'PUT',
    data,
  });
}

export async function supplierServiceDestroy(id: string) {
  const url = `${ROOT_API}/${API_VERSION}/supplier/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
  });
}
