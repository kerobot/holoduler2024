import { Route, Routes } from "react-router-dom";
import { Holoduler } from "../scenarios/Holoduler";
import { Page404 } from "../components/pages/Page404";

// ルーターコンポーネント
export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Holoduler />} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};
