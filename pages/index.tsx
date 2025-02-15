import Head from "next/head";
import Layout from "@/components/organisms/Layout";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import { supplierService } from "@/services/supplier-service";
import { supplierType } from "@/services/data-types/supplier-type";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<supplierType[]>([]);

  const getSuppliers = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await supplierService();

      if (response.error) {
        alert(response.message);
      } else {
        setSuppliers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Suppliers</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Suppliers</li>
          </ol>
          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Data Suppliers{" "}
              <div className="d-flex justify-content-end gap-1">
                <Button
                  type="button"
                  onClickButton={getSuppliers}
                  isLoading={isLoading}
                  className={["btn btn-primary btn-sm"]}
                >
                  <i className="fas fa-sync-alt me-1"></i>
                </Button>
                <Button
                  type="link"
                  href="/supplier/create"
                  className={["btn btn-primary btn-sm me-2"]}
                >
                  Tambah Data
                </Button>
              </div>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama Supplier</th>
                    <th scope="col">Kontak</th>
                    <th scope="col">Alamat</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((item: supplierType, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.Supplier_Name}</td>
                      <td>{item.Supplier_Contact}</td>
                      <td>{item.Address}</td>
                      <td>
                        <Button
                          type="button"
                          className={["btn btn-success btn-sm me-2"]}
                        >
                          Detail
                        </Button>
                        <Button
                          type="link"
                          href={`supplier/edit/${item.id}`} 
                          className={["btn btn-warning btn-sm me-2"]}
                        >
                          Update
                        </Button>
                        <Button
                          type="button"
                          href={`supplier/edit/${item.id}`}
                          className={["btn btn-danger btn-sm me-2"]}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
