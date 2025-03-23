import prisma from "../config/database";

export class MessageService {
  async createMessageService(
    body: string,
    subject: string,
    userId: string,
    conversationId: string,
    toUserId: string,
    image?: string
  ) {
    const newMessage = await prisma.message.create({
      data: {
        body,
        subject,
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
        conversationId:id,
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
}
