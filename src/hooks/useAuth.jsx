// 認証周りのカスタムフックを定義
import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useToastMessage } from "./useToastMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { showMessage } = useToastMessage();
  // グローバルなステートを読み込み
  const { setLoinUser } = useLoginUser();

  const login = useCallback(
    (id) => {
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            // 読み込めない箇所
            // setLoinUser(res.data);
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "ユーザーが見つかりません", status: "error" });
          }
        })
        .catch(() =>
          showMessage({ title: "ログインできません", status: "error" })
        )
        .finally(() => {
          setLoading(false);
        });
    },
    [history, showMessage, setLoinUser]
  );
  return { login, loading };
};
