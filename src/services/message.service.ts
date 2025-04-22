import prisma from "../config/database";

export class MessageService {
  async createMessageService(
    body: string,
    userId: string,
    conversationId: string,
    toUserId: string,
    image: string[]
  ) {
    // Validating sender (userId) exists
    const sender = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!sender) {
      throw new Error(`Sender with userId ${userId} does not exist`);
    }

    // Validating recipient (toUserId) exists
    const recipient = await prisma.user.findUnique({
      where: { id: toUserId },
    });
    if (!recipient) {
      throw new Error(`Recipient with toUserId ${toUserId} does not exist`);
    }

    // Validating conversation exists
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new Error(
        `Conversation with conversationId ${conversationId} does not exist`
      );
    }
    const newMessage = await prisma.message.create({
      data: {
        body,
        userId,
        toUserId,
        conversationId,
        image,
      },
    });

    // Update the conversation's last message
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessage: body },
    });

    return newMessage;
  }
  async updateMessageReadStatus(id: string, userId: string, isRead: boolean) {
    const newMessage = await prisma.message.update({
      where: {
        id,
        toUserId: userId,
      },
      data: {
        isRead,
      },
    });

    return newMessage;
  }

  async updateMessageDeletedStatus(
    id: string,
    userId: string,
    isDeleted: boolean
  ) {
    const newMessage = await prisma.message.update({
      where: {
        id,
        toUserId: userId,
      },
      data: {
        isDeleted,
      },
    });

    return newMessage;
  }

  async updateMessageImportantStatus(
    id: string,
    userId: string,
    isImportant: boolean
  ) {
    const newMessage = await prisma.message.update({
      where: {
        id,
        toUserId: userId,
      },
      data: {
        isImportant,
      },
    });

    return newMessage;
  }

  async getSingleMessageService(id: string) {
    const newMessage = await prisma.message.findUnique({
      where: {
        id,
      },
    });

    return newMessage;
  }

  async getAllMessageService(id: string) {
    const newMessage = await prisma.message.findMany({
      where: {
        conversationId: id,
      },
    });

    return newMessage;
  }

  async deleteMessageService(id: string, userId: string) {
    await prisma.message.delete({
      where: {
        id,
        userId,
      },
    });

    return "Message deleted successfully";
  }

  async getUserMessageCounts(userId: string) {
    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error(`User with ID ${userId} does not exist`);
    }
  
    // Fetch message counts using Prisma count queries
    const [totalMessages, readMessages, unreadMessages, inboxMessages, importantMessages] = await Promise.all([
      // Total messages (sent or received, excluding deleted)
      prisma.message.count({
        where: {
          OR: [{ userId }, { toUserId: userId }],
          isDeleted: false,
        },
      }),
      // Read messages (received by user)
      prisma.message.count({
        where: {
          toUserId: userId,
          isRead: true,
          isDeleted: false,
        },
      }),
      // Unread messages (received by user)
      prisma.message.count({
        where: {
          toUserId: userId,
          isRead: false,
          isDeleted: false,
        },
      }),
      // Inbox messages (received by user, excluding deleted)
      prisma.message.count({
        where: {
          toUserId: userId,
          isDeleted: false,
        },
      }),
      // Important (liked) messages (received by user)
      prisma.message.count({
        where: {
          toUserId: userId,
          isImportant: true,
          isDeleted: false,
        },
      }),
    ]);
  
    return {
      totalMessages,
      readMessages,
      unreadMessages,
      inboxMessages,
      importantMessages,
    };
  }
}
