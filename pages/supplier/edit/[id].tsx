import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { supplierType } from "@/services/data-types/supplier-type";
import { supplierServiceEdit, supplierServiceUpdate } from "@/services/supplier-service";

import React, { useState } from "react";

export default function EditSupplier({
  supplierDetail,
  id,
}: {
  supplierDetail: supplierType;
  id: string;
}) {
  const [datas, setDatas] = useState<supplierType>(supplierDetail);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    Supplier_Name: "",
    Supplier_Contact: "",
    Address: "",
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("Nama Supplier", datas.Supplier_Name);
      data.append("Kontak", datas.Supplier_Contact || "");
      data.append("Alamat", datas.Address || "");

      const response = await supplierServiceUpdate(data, id);

      if (!response.error) {
        alert("Supplier edited unccessfully");

      } else {
        if (response.message) {
          Object.entries(response.message).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              setIsError({ ...isError, [key]: "is-invalid" });
              alert(value[0]);
            }
          });
        }
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Suppliers</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">Suppliers</li>
            <li className="breadcrumb-item active">Edit data supplier</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Nama Supplier
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder={supplierDetail.Supplier_Name}
                      value={datas.Supplier_Name}
                      onChange={(e) =>
                        setDatas({ ...datas, Supplier_Name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputContact" className="form-label">
                      Kontak
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="inputContact"
                      placeholder={supplierDetail.Supplier_Contact}
                      value={datas.Supplier_Contact}
                      onChange={(e) =>
                        setDatas({ ...datas, Supplier_Contact: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">
                      Alamat
                    </label>
                    <input
                      type="textarea"
                      className="form-control"
                      id="inputAddress"
                      placeholder={supplierDetail.Address}
                      value={datas.Address}
                      onChange={(e) =>
                        setDatas({ ...datas, Address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
            <Button
              type="button"
              onClickButton={onSubmit}
              className={["btn btn-primary"]}
            >
              Submit
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
}

interface GetServerSideProps {
  params: {
    id: string;
  };
}

export async function getServerSideProps({ params }: GetServerSideProps) {
  const { id } = params;

  const response = await supplierServiceEdit(id);

  return {
    props: {
      supplierDetail: response.data,
      id: id,
    },
  };
}
