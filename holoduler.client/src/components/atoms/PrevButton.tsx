import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

type Props = {
    onClick: () => void;
};

// Prevボタンコンポーネント
export const PrevButton: FC<Props> = (props) => {
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
};
