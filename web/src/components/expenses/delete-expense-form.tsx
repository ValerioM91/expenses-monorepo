import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { useModalContext } from '../ui/modal/modal-context'
import { useDeleteExpenseMutation } from '../../gql/hooks'
import { useNavigateToPage } from '../../hooks/use-navigate-to-page'

export const DeleteExpenseForm = ({ id }: { id: number }) => {
  const { setOpen } = useModalContext()
  const navigateToPage = useNavigateToPage()

  const [mutation, { loading }] = useDeleteExpenseMutation({
    onCompleted: () => {
      navigateToPage(1)
      setOpen(false)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        mutation({ variables: { removeExpenseId: id } })
      }}
    >
      <Box>
        <Text fontSize="lg">{'Deleting this item cannot be undone'}</Text>
      </Box>

      <Flex justifyContent="center" gap={6} mt={6}>
        <Button
          type="button"
          alignSelf="flex-start"
          onClick={() => setOpen(false)}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button type="submit" bg="fg.error" alignSelf="flex-start" disabled={loading}>
          Delete
        </Button>
      </Flex>
    </form>
  )
}
