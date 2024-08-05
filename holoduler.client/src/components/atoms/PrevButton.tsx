import { FC, memo } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

type PrevButtonProps = {
    onClick: () => void;
};

// Prevボタンコンポーネント
export const PrevButton: FC<PrevButtonProps> = memo((props) => {
    const { onClick } = props;

    return (
        <Button
            leftIcon={<ArrowLeftIcon />}
            colorScheme='blue'
            variant='solid'
            display="block"
            onClick={onClick}
        >Prev</Button>
    );
});
