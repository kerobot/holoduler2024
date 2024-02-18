import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

type Props = {
    onClick: () => void;
};

// Nextボタンコンポーネント
export const NextButton: FC<Props> = (props) => {
    const { onClick } = props;

    return (
        <Button
            rightIcon={<ArrowRightIcon />}
            colorScheme='blue'
            variant='solid'
            display="block"
            onClick={onClick}
        >Next</Button>
    );
};
