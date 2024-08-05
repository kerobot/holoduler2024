import { FC, memo } from "react";
import { Box, Heading } from "@chakra-ui/react";

type TitleControlProps = {
    onClickToday: () => void;
};

// タイトルを表示するコンポーネント
export const TitleControl: FC<TitleControlProps> = memo((props) => {
    const { onClickToday } = props;

    return (
        <Box as="a" _hover={{ cursor: "pointer" }} onClick={onClickToday}>
            <Heading size='lg'>HOLODULER</Heading>
        </Box>
    );
});
