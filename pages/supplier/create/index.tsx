import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { supplierType } from "@/services/data-types/supplier-type";
import { supplierServiceStore } from "@/services/supplier-service";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CreateSupplier() {
  const router = useRouter();
  const [datas, setDatas] = useState<supplierType>({
    Supplier_Name: "",
    Supplier_Contact: "",
    Address: "",
  });
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

      const response = await supplierServiceStore(data);

      if (!response.error) {
        alert("Supplier Data created unccessfully");
        router.push("/");
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
            <li className="breadcrumb-item active">Tambah data supplier</li>
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
                      placeholder="Nama Supplier"
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
                      type="text"
                      className="form-control"
                      id="inputContact"
                      placeholder="Nomor HP"
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
                      placeholder=""
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
