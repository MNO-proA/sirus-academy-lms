const { SquareClient } = require('square');
const { randomUUID } = require("crypto");
const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");


const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
});

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
      sourceId,
      locationId,
    } = req.body;
console.log(req.body)
console.log("Square Access Token:", process.env.SQUARE_ACCESS_TOKEN);

const accessToken = process.env.SQUARE_ACCESS_TOKEN;
const url = "https://connect.squareupsandbox.com/v2/payments";

const payload = {
  idempotency_key: randomUUID(),
  source_id: sourceId,
  location_id: locationId,
  amount_money: {
    amount: Math.round(coursePricing * 100), // Convert dollars to cents
    currency: "USD",
  },
  metadata: {
    courseId,
    userId,
  },
};

const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
    "Square-Version": "2024-02-11",
  },
  body: JSON.stringify(payload),
});

const paymentResult = await response.json();

if (!response.ok) {
  throw new Error(`Square API Error: ${JSON.stringify(paymentResult)}`);
}

console.log(paymentResult);

   
    if (paymentResult?.payment.status === 'COMPLETED') {
      const newlyCreatedCourseOrder = new Order({
        userId,
        userName,
        userEmail,
        orderStatus: "confirmed",
        paymentMethod: "square",
        paymentStatus: "paid",
        orderDate,
        paymentId: paymentResult.payment.id,
        instructorId,
        instructorName,
        courseImage,
        courseTitle,
        courseId,
        coursePricing,
      });

      await newlyCreatedCourseOrder.save();

      // Update student courses
      const studentCourses = await StudentCourses.findOne({
        userId: userId,
      });

      if (studentCourses) {
        studentCourses.courses.push({
          courseId,
          title: courseTitle,
          instructorId,
          instructorName,
          dateOfPurchase: orderDate,
          courseImage,
        });

        await studentCourses.save();
      } else {
        const newStudentCourses = new StudentCourses({
          userId,
          courses: [
            {
              courseId,
              title: courseTitle,
              instructorId,
              instructorName,
              dateOfPurchase: orderDate,
              courseImage,
            },
          ],
        });

        await newStudentCourses.save();
      }

      // Update course schema students
      await Course.findByIdAndUpdate(courseId, {
        $addToSet: {
          students: {
            studentId: userId,
            studentName: userName,
            studentEmail: userEmail,
            paidAmount: coursePricing,
          },
        },
      });


      res.status(201).json({
        success: true,
        data: {
          orderId: newlyCreatedCourseOrder._id,
          paymentId: paymentResult.payment.id,
          paymentStatus: paymentResult.payment.status,
          receiptUrl: paymentResult.payment.receipt_url,
          cardDetails: paymentResult.payment.card_details,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error processing payment",
    });
  }
};

module.exports = { createOrder };