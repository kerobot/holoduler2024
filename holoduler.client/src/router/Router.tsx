import { Route, Routes } from "react-router-dom";
import { Holoduler } from "../scenarios/Holoduler";
import { NotFound } from "../scenarios/NotFound";

// ルーターコンポーネント
export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Holoduler />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};
