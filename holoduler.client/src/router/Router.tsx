import { Route, Routes } from "react-router-dom";

import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Holoduler } from "../components/pages/Holoduler";
import { Page404 } from "../components/pages/Page404";

// ルーターコンポーネント
export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<HeaderLayout><Holoduler /></HeaderLayout>} />
            <Route path="/:date" element={<HeaderLayout><Holoduler /></HeaderLayout>} />
            <Route path="*" element={<Page404 />} />
        </Routes>
    );
};
