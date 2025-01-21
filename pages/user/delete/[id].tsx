import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userServiceDestroy } from "@/services/user-service";
import Head from "next/head";
import Layout from "@/components/organisms/Layout";
import Button from "@/components/atoms/Button";

export default function DeleteUser() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus pengguna ini?"
    );
    if (confirmDelete) {
      setIsLoading(true);
      try {
        const response = await userServiceDestroy(id as string);
        if (response.error) {
          alert(response.message);
        } else {
          alert("Pengguna berhasil dihapus.");

          router.push("/user");
        }
      } catch (error) {
        console.log(error);
        alert("Terjadi kesalahan saat menghapus pengguna.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    handleDelete();
  }, [id]);

  return (
    <>
      <Head>
        <title>Hapus Pengguna</title>
        <meta name="description" content="Halaman untuk menghapus pengguna" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Hapus Pengguna</h1>
          <div className="alert alert-warning" role="alert">
            Menghapus pengguna tidak dapat dibatalkan. Apakah Anda yakin ingin
            melanjutkan?
          </div>
          <Button
            type="button"
            onClickButton={handleDelete}
            isLoading={isLoading}
            className={["btn btn-danger"]}
          >
            Hapus Pengguna
          </Button>
          <Button
            type="button"
            onClickButton={() => router.push("/user")}
            className={["btn btn-secondary ms-2"]}
          >
            Batal
          </Button>
        </div>
      </Layout>
    </>
  );
}
