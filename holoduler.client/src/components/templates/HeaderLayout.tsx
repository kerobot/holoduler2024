import { memo, ReactNode, FC } from "react";
import { Flex } from "@chakra-ui/react";

/*import { Header } from "../organisms/Header";*/

/*
<Flex as="header" position="fixed" zIndex="10" backgroundColor="white" w="100%" top="0px">
    <Header />
</Flex>
*/

type HeaderLayoutProps = {
    children: ReactNode;
};

// テンプレートコンポーネント
export const HeaderLayout: FC<HeaderLayoutProps> = memo((props) => {
    const { children } = props;

    return (
        <>
            <Flex as="main" mt="20" p="3">
                {children}
            </Flex>
        </>
    );
});
